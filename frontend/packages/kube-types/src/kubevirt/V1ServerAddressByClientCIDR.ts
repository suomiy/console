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
 * ServerAddressByClientCIDR helps the client to determine the server address that they should use, depending on the clientCIDR that they match.
 * @export
 * @interface V1ServerAddressByClientCIDR
 */
export interface V1ServerAddressByClientCIDR {
  /**
   * The CIDR with which clients can match their IP to figure out the server address that they should use.
   * @type {string}
   * @memberof V1ServerAddressByClientCIDR
   */
  clientCIDR: string;
  /**
   * Address of this server, suitable for a client that matches the above CIDR. This can be a hostname, hostname:port, IP or IP:port.
   * @type {string}
   * @memberof V1ServerAddressByClientCIDR
   */
  serverAddress: string;
}
