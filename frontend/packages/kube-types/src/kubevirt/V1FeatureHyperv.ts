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

import { V1FeatureSpinlocks } from './V1FeatureSpinlocks';
import { V1FeatureState } from './V1FeatureState';
import { V1FeatureVendorID } from './V1FeatureVendorID';

/**
 * Hyperv specific features.
 * @export
 * @interface V1FeatureHyperv
 */
export interface V1FeatureHyperv {
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  evmcs?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  frequencies?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  ipi?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  reenlightenment?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  relaxed?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  reset?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  runtime?: V1FeatureState;
  /**
   *
   * @type {V1FeatureSpinlocks}
   * @memberof V1FeatureHyperv
   */
  spinlocks?: V1FeatureSpinlocks;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  synic?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  synictimer?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  tlbflush?: V1FeatureState;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  vapic?: V1FeatureState;
  /**
   *
   * @type {V1FeatureVendorID}
   * @memberof V1FeatureHyperv
   */
  vendorid?: V1FeatureVendorID;
  /**
   *
   * @type {V1FeatureState}
   * @memberof V1FeatureHyperv
   */
  vpindex?: V1FeatureState;
}
