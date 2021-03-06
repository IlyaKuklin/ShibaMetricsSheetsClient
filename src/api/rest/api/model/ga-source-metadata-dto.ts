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


export interface GASourceMetadataDto { 
    selectedAccountId?: string | null;
    selectedSummaryId?: string | null;
    selectedPropertyId?: string | null;
    selectedProfileId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    selectedMetricIds?: Array<string> | null;
    selectedDimensionIds?: Array<string> | null;
    filters?: Array<SMSourceFilter> | null;
}

