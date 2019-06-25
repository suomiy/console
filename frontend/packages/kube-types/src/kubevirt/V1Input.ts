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
 * @interface V1Input
 */
export interface V1Input {
  /**
   * Bus indicates the bus of input device to emulate. Supported values: virtio, usb.
   * @type {string}
   * @memberof V1Input
   */
  bus?: string;
  /**
   * Name is the device name
   * @type {string}
   * @memberof V1Input
   */
  name: string;
  /**
   * Type indicated the type of input device. Supported values: tablet.
   * @type {string}
   * @memberof V1Input
   */
  type: string;
}
