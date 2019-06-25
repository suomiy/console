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

import { V1HTTPHeader } from './V1HTTPHeader';

/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 * @export
 * @interface V1HTTPGetAction
 */
export interface V1HTTPGetAction {
  /**
   * Host name to connect to, defaults to the pod IP. You probably want to set \"Host\" in httpHeaders instead.
   * @type {string}
   * @memberof V1HTTPGetAction
   */
  host?: string;
  /**
   * Custom headers to set in the request. HTTP allows repeated headers.
   * @type {Array<V1HTTPHeader>}
   * @memberof V1HTTPGetAction
   */
  httpHeaders?: V1HTTPHeader[];
  /**
   * Path to access on the HTTP server.
   * @type {string}
   * @memberof V1HTTPGetAction
   */
  path?: string;
  /**
   * Scheme to use for connecting to the host. Defaults to HTTP.
   * @type {string}
   * @memberof V1HTTPGetAction
   */
  scheme?: string;
}
