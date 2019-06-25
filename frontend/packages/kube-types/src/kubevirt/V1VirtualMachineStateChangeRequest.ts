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
 *
 * @export
 * @interface V1VirtualMachineStateChangeRequest
 */
export interface V1VirtualMachineStateChangeRequest {
  /**
   * Indicates the type of action that is requested. e.g. Start or Stop
   * @type {string}
   * @memberof V1VirtualMachineStateChangeRequest
   */
  action: string;
  /**
   *
   * @type {object}
   * @memberof V1VirtualMachineStateChangeRequest
   */
  uid?: object;
}
