/**
 * Shibametrics API
 * Shibametrics API Reference
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GADateRange } from './ga-date-range';
import { GAPivot } from './ga-pivot';
import { GAOrderBy } from './ga-order-by';
import { GADimensionFilterClause } from './ga-dimension-filter-clause';
import { GAMetric } from './ga-metric';
import { GACohortGroup } from './ga-cohort-group';
import { GADimension } from './ga-dimension';
import { GAMetricFilterClause } from './ga-metric-filter-clause';
import { GASegment } from './ga-segment';


export interface GAReportRequest { 
    cohortGroup?: GACohortGroup;
    dateRanges?: Array<GADateRange> | null;
    dimensionFilterClauses?: Array<GADimensionFilterClause> | null;
    dimensions?: Array<GADimension> | null;
    filtersExpression?: string | null;
    hideTotals?: boolean | null;
    hideValueRanges?: boolean | null;
    includeEmptyRows?: boolean | null;
    metricFilterClauses?: Array<GAMetricFilterClause> | null;
    metrics?: Array<GAMetric> | null;
    orderBys?: Array<GAOrderBy> | null;
    pageSize?: number | null;
    pageToken?: string | null;
    pivots?: Array<GAPivot> | null;
    samplingLevel?: string | null;
    segments?: Array<GASegment> | null;
    viewId?: string | null;
    eTag?: string | null;
}

