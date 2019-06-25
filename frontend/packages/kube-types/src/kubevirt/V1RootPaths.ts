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
 * RootPaths lists the paths available at root. For example: \"/healthz\", \"/apis\".
 * @export
 * @interface V1RootPaths
 */
export interface V1RootPaths {
  /**
   * paths are the paths available at root.
   * @type {Array<string>}
   * @memberof V1RootPaths
   */
  paths: string[];
}
