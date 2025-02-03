import { TestBed } from '@angular/core/testing';

import { MetaDataPersistence } from "./metadata-db";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

describe('Time Series Db', () => {
  let timeSeriesDB: MetaDataPersistence;

  beforeEach(() => {
    let logger = new Logger();
    timeSeriesDB = new MetaDataPersistence(logger);
  });

  it('should be created', () => {
    expect(timeSeriesDB).toBeTruthy();
  });
});
