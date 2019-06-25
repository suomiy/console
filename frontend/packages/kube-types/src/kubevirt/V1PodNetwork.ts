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
 * Represents the stock pod network interface.
 * @export
 * @interface V1PodNetwork
 */
export interface V1PodNetwork {
  /**
   * CIDR for vm network. Default 10.0.2.0/24 if not specified.
   * @type {string}
   * @memberof V1PodNetwork
   */
  vmNetworkCIDR?: string;
}
