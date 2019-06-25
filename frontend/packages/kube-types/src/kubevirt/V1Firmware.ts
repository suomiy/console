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

import { V1Bootloader } from './V1Bootloader';

/**
 *
 * @export
 * @interface V1Firmware
 */
export interface V1Firmware {
  /**
   *
   * @type {V1Bootloader}
   * @memberof V1Firmware
   */
  bootloader?: V1Bootloader;
  /**
   * The system-serial-number in SMBIOS
   * @type {string}
   * @memberof V1Firmware
   */
  serial?: string;
  /**
   * UUID reported by the vmi bios. Defaults to a random generated uid.
   * @type {string}
   * @memberof V1Firmware
   */
  uuid?: string;
}
