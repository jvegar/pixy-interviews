export interface Station {
  stationId: string;
  idx: number;
  country: string;
  city: string;
  station: string;
  createdAt: number;
}

export interface TableParams {
  TableName: string;
  Item: Station | Feed;
}

export interface Feed {
  feedId: string;
  idx: string;
  aqi: number;
  time: string;
  level: string;
  city: string;
  url: string;
  createdAt: number;
}

export enum AqiLevels {
  UNDEFINED = 'Undefined',
  GOOD = 'Good',
  MODERATE = 'Moderate',
  UNHEALTHY_SENSITIVE_GROUPS = 'Unhealty for Sensisitive Groups',
  UNHEALTHY = 'Unhealthy',
  VERY_UNHEALTHY = 'Very Unhealthy',
  HAZARDOUS = 'Hazardous',
}
