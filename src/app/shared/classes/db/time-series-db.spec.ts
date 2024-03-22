import { TestBed } from '@angular/core/testing';

import { MetaDataPersistence } from './time-series-db';
import { Logger } from '../../services/logging/logger';

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
