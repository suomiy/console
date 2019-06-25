// tslint:disable
/**
 * KubeVirt API
 * This is KubeVirt API an add-on for Kubernetes.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: kubevirt-dev@googlegroups.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1FeatureAPIC } from './V1FeatureAPIC';
import { V1FeatureHyperv } from './V1FeatureHyperv';
import { V1FeatureState } from './V1FeatureState';

/**
 *
 * @export
 * @interface V1Features
 */
export interface V1Features {
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1Features
   */
  acpi?: V1FeatureState;
  /**
   *
   * @type {V1FeatureAPIC}
   * @memberof V1Features
   */
  apic?: V1FeatureAPIC;
  /**
   *
   * @type {V1FeatureHyperv}
   * @memberof V1Features
   */
  hyperv?: V1FeatureHyperv;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1Features
   */
  smm?: V1FeatureState;
}
