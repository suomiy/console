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

/**
 * i6300esb watchdog device.
 * @export
 * @interface V1I6300ESBWatchdog
 */
export interface V1I6300ESBWatchdog {
  /**
   * The action to take. Valid values are poweroff, reset, shutdown. Defaults to reset.
   * @type {string}
   * @memberof V1I6300ESBWatchdog
   */
  action?: string;
}
