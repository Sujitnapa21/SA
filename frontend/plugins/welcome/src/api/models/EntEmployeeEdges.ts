/* tslint:disable */
/* eslint-disable */
/**
 * SUT SA Example API Patient
 * This is a sample server for SUT SE 2563
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    EntPatient,
    EntPatientFromJSON,
    EntPatientFromJSONTyped,
    EntPatientToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntEmployeeEdges
 */
export interface EntEmployeeEdges {
    /**
     * Patient holds the value of the patient edge.
     * @type {Array<EntPatient>}
     * @memberof EntEmployeeEdges
     */
    patient?: Array<EntPatient>;
}

export function EntEmployeeEdgesFromJSON(json: any): EntEmployeeEdges {
    return EntEmployeeEdgesFromJSONTyped(json, false);
}

export function EntEmployeeEdgesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntEmployeeEdges {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'patient': !exists(json, 'patient') ? undefined : ((json['patient'] as Array<any>).map(EntPatientFromJSON)),
    };
}

export function EntEmployeeEdgesToJSON(value?: EntEmployeeEdges | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'patient': value.patient === undefined ? undefined : ((value.patient as Array<any>).map(EntPatientToJSON)),
    };
}

