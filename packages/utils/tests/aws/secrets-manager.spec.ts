import { SecretsManager } from '../../src/aws/secrets-manager';

const getSecretValueMock = jest.fn();

jest.mock('@aws-sdk/client-secrets-manager', () => {
  return {
    SecretsManager: jest.fn(() => {
      return {
        getSecretValue: getSecretValueMock,
      };
    }),
  };
});

const FAKE_SECRET = {
  SecretString: '{ "fake-field": "fake-data" }',
  SecretBinary: null,
};

const FAKE_SECRET_ID = 'fakeSecret';

describe('SecretsManager', () => {
  let sm;

  beforeEach(() => {
    sm = new SecretsManager({ region: 'fake region' });

    getSecretValueMock.mockResolvedValue(FAKE_SECRET);
  });

  afterEach(() => {
    getSecretValueMock.mockReset();
  });

  it('should resolve', async () => {
    return sm.getValue(FAKE_SECRET_ID);
  });

  it('should return a string', async () => {
    return expect(sm.getValue(FAKE_SECRET_ID, { json: false })).resolves.toEqual(
      FAKE_SECRET.SecretString
    );
  });

  it('should return a JSON', async () => {
    return expect(sm.getValue(FAKE_SECRET_ID, { json: true })).resolves.toEqual(
      JSON.parse(FAKE_SECRET.SecretString)
    );
  });

  it('should return a Buffer object', async () => {
    const fake_binary_data = 'FAKE BINARY';
    getSecretValueMock.mockResolvedValue({
      SecretBinary: Buffer.from(fake_binary_data),
    });

    const result = await sm.getValue(FAKE_SECRET_ID);

    expect(Buffer.isBuffer(result)).toBeTruthy();
    expect(Buffer.compare(Buffer.from(fake_binary_data), result)).toBe(0);
  });

  it('should reject', async () => {
    const expectedError = new Error('Resource not found');
    expectedError.name = 'ResourceNotFoundException';

    getSecretValueMock.mockRejectedValue(expectedError);

    return expect(sm.getValue(FAKE_SECRET_ID)).rejects.toEqual(expectedError);
  });
});
