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
import { YDMetadataMetric } from './yd-metadata-metric';
import { YDClient } from './yd-client';
import { YDMetadataFilter } from './yd-metadata-filter';


export interface YDMetadataDto { 
    clients?: Array<YDClient> | null;
    metrics?: Array<YDMetadataMetric> | null;
    filters?: Array<YDMetadataFilter> | null;
}

