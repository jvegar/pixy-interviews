export interface Station {
  stationid: string;
  idx: number;
  country: string;
  city: string;
  station: string;
  createdAt: number;
}

export interface Station_Params {
  TableName: string;
  Item: Station;
}

export interface Feed {
  feedid: string;
  idx: string;
  aqi: number;
  time: string;
  level: string;
  city: string;
  url: string;
  createdAt: number;
}

export interface Feed_Params {
  TableName: string;
  Item: Feed;
}
