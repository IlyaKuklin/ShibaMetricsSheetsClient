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
import { GADimensionFilterClause } from './ga-dimension-filter-clause';
import { GAMetric } from './ga-metric';
import { GADimension } from './ga-dimension';


export interface GAPivot { 
    dimensionFilterClauses?: Array<GADimensionFilterClause> | null;
    dimensions?: Array<GADimension> | null;
    maxGroupCount?: number | null;
    metrics?: Array<GAMetric> | null;
    startGroup?: number | null;
    eTag?: string | null;
}

