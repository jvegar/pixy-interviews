import { SecretsManager as AWSSecretManager } from '@aws-sdk/client-secrets-manager';

interface GetValueOptions {
  version?: string;
  json?: boolean;
}

export class SecretsManager {
  private readonly sm: AWSSecretManager;

  constructor(options) {
    this.sm = new AWSSecretManager(options);
  }

  async getValue(secretId, options: GetValueOptions = { version: null, json: true }): Promise<any> {
    const secret = await this.sm.getSecretValue({
      SecretId: secretId,
      VersionStage: options.version,
    });

    return (
      secret.SecretBinary ?? (options.json ? JSON.parse(secret.SecretString) : secret.SecretString)
    );
  }
}
