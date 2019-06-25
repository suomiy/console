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

import { V1ClockOffsetUTC } from './V1ClockOffsetUTC';
import { V1Timer } from './V1Timer';

/**
 * Represents the clock and timers of a vmi.
 * @export
 * @interface V1Clock
 */
export interface V1Clock {
  /**
   *
   * @type {V1Timer}
   * @memberof V1Clock
   */
  timer: V1Timer;
  /**
   *
   * @type {object}
   * @memberof V1Clock
   */
  timezone?: object;
  /**
   *
   * @type {V1ClockOffsetUTC}
   * @memberof V1Clock
   */
  utc?: V1ClockOffsetUTC;
}
