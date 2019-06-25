// tslint:disable
/**
 * OpenShift API (with Kubernetes)
 * OpenShift provides builds, application lifecycle, image content management, and administrative policy on top of Kubernetes. The API allows consistent management of those objects.  All API operations are authenticated via an Authorization bearer token that is provided for service accounts as a generated secret (in JWT form) or via the native OAuth endpoint located at /oauth/authorize. Core infrastructure components may use client certificates that require no authentication.  All API operations return a \'resourceVersion\' string that represents the version of the object in the underlying storage. The standard LIST operation performs a snapshot read of the underlying objects, returning a resourceVersion representing a consistent version of the listed objects. The WATCH operation allows all updates to a set of objects after the provided resourceVersion to be observed by a client. By listing and beginning a watch from the returned resourceVersion, clients may observe a consistent view of the state of one or more objects. Note that WATCH always returns the update after the provided resourceVersion. Watch may be extended a limited time in the past - using etcd 2 the watch window is 1000 events (which on a large cluster may only be a few tens of seconds) so clients must explicitly handle the \"watch to old error\" by re-listing.  Objects are divided into two rough categories - those that have a lifecycle and must reflect the state of the cluster, and those that have no state. Objects with lifecycle typically have three main sections:  * \'metadata\' common to all objects * a \'spec\' that represents the desired state * a \'status\' that represents how much of the desired state is reflected on   the cluster at the current time  Objects that have no state have \'metadata\' but may lack a \'spec\' or \'status\' section.  Objects are divided into those that are namespace scoped (only exist inside of a namespace) and those that are cluster scoped (exist outside of a namespace). A namespace scoped resource will be deleted when the namespace is deleted and cannot be created if the namespace has not yet been created or is in the process of deletion. Cluster scoped resources are typically only accessible to admins - resources like nodes, persistent volumes, and cluster policy.  All objects have a schema that is a combination of the \'kind\' and \'apiVersion\' fields. This schema is additive only for any given version - no backwards incompatible changes are allowed without incrementing the apiVersion. The server will return and accept a number of standard responses that share a common schema - for instance, the common error type is \'metav1.Status\' (described below) and will be returned on any error from the API server.  The API is available in multiple serialization formats - the default is JSON (Accept: application/json and Content-Type: application/json) but clients may also use YAML (application/yaml) or the native Protobuf schema (application/vnd.kubernetes.protobuf). Note that the format of the WATCH API call is slightly different - for JSON it returns newline delimited objects while for Protobuf it returns length-delimited frames (4 bytes in network-order) that contain a \'versioned.Watch\' Protobuf object.  See the OpenShift documentation at https://docs.openshift.org for more information.
 *
 * The version of the OpenAPI document: latest
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { OSV1BinaryBuildSource } from './OSV1BinaryBuildSource';
import { OSV1ConfigMapBuildSource } from './OSV1ConfigMapBuildSource';
import { OSV1GitBuildSource } from './OSV1GitBuildSource';
import { OSV1ImageSource } from './OSV1ImageSource';
import { OSV1SecretBuildSource } from './OSV1SecretBuildSource';
import { V1LocalObjectReference } from './V1LocalObjectReference';

/**
 * BuildSource is the SCM used for the build.
 * @export
 * @interface OSV1BuildSource
 */
export interface OSV1BuildSource {
  /**
   *
   * @type {OSV1BinaryBuildSource}
   * @memberof OSV1BuildSource
   */
  binary?: OSV1BinaryBuildSource;
  /**
   * configMaps represents a list of configMaps and their destinations that will be used for the build.
   * @type {Array<OSV1ConfigMapBuildSource>}
   * @memberof OSV1BuildSource
   */
  configMaps?: OSV1ConfigMapBuildSource[];
  /**
   * contextDir specifies the sub-directory where the source code for the application exists. This allows to have buildable sources in directory other than root of repository.
   * @type {string}
   * @memberof OSV1BuildSource
   */
  contextDir?: string;
  /**
   * dockerfile is the raw contents of a Dockerfile which should be built. When this option is specified, the FROM may be modified based on your strategy base image and additional ENV stanzas from your strategy environment will be added after the FROM, but before the rest of your Dockerfile stanzas. The Dockerfile source type may be used with other options like git - in those cases the Git repo will have any innate Dockerfile replaced in the context dir.
   * @type {string}
   * @memberof OSV1BuildSource
   */
  dockerfile?: string;
  /**
   *
   * @type {OSV1GitBuildSource}
   * @memberof OSV1BuildSource
   */
  git?: OSV1GitBuildSource;
  /**
   * images describes a set of images to be used to provide source for the build
   * @type {Array<OSV1ImageSource>}
   * @memberof OSV1BuildSource
   */
  images?: OSV1ImageSource[];
  /**
   * secrets represents a list of secrets and their destinations that will be used only for the build.
   * @type {Array<OSV1SecretBuildSource>}
   * @memberof OSV1BuildSource
   */
  secrets?: OSV1SecretBuildSource[];
  /**
   *
   * @type {V1LocalObjectReference}
   * @memberof OSV1BuildSource
   */
  sourceSecret?: V1LocalObjectReference;
  /**
   * type of build input to accept
   * @type {string}
   * @memberof OSV1BuildSource
   */
  type: string;
}
