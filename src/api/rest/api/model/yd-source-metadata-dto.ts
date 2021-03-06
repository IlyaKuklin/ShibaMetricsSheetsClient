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
import { SMSourceFilter } from './sm-source-filter';


export interface YDSourceMetadataDto { 
    startDate?: string | null;
    endDate?: string | null;
    selectedAccountId?: string | null;
    selectedClientId?: number;
    selectedMetricIds?: Array<string> | null;
    filters?: Array<SMSourceFilter> | null;
}

