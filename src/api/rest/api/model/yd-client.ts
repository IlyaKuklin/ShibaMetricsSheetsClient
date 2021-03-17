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
import { YDClientType } from './yd-client-type';


export interface YDClient { 
    clientId?: number;
    clientInfo?: string | null;
    login?: string | null;
    phone?: string | null;
    type?: YDClientType;
}

