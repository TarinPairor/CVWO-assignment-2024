export interface Entity {
  bingEntitySearchApiId: string;
  dataSource: string;
  dataSourceEntityId: string;
  language: string;
  matches?: Match[];
  name: string;
  url: string;
}

export interface Match {
  text: string;
  confidenceScore: number;
}

export interface Result {
  entities: Entity[];
  id: string;
  error?: string; // Making the error property optional
}
