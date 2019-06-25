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

import { IoK8sApimachineryPkgRuntimeRawExtension } from './IoK8sApimachineryPkgRuntimeRawExtension';

/**
 * SubjectAccessReview is an object for requesting information about whether a user or group can perform an action
 * @export
 * @interface OSV1SubjectAccessReview
 */
export interface OSV1SubjectAccessReview {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  apiVersion?: string;
  /**
   *
   * @type {IoK8sApimachineryPkgRuntimeRawExtension}
   * @memberof OSV1SubjectAccessReview
   */
  content?: IoK8sApimachineryPkgRuntimeRawExtension;
  /**
   * GroupsSlice is optional. Groups is the list of groups to which the User belongs.
   * @type {Array<string>}
   * @memberof OSV1SubjectAccessReview
   */
  groups: string[];
  /**
   * IsNonResourceURL is true if this is a request for a non-resource URL (outside of the resource hieraarchy)
   * @type {boolean}
   * @memberof OSV1SubjectAccessReview
   */
  isNonResourceURL: boolean;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  kind?: string;
  /**
   * Namespace is the namespace of the action being requested.  Currently, there is no distinction between no namespace and all namespaces
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  namespace: string;
  /**
   * Path is the path of a non resource URL
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  path: string;
  /**
   * Resource is one of the existing resource types
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  resource: string;
  /**
   * Group is the API group of the resource Serialized as resourceAPIGroup to avoid confusion with the \'groups\' field when inlined
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  resourceAPIGroup: string;
  /**
   * Version is the API version of the resource Serialized as resourceAPIVersion to avoid confusion with TypeMeta.apiVersion and ObjectMeta.resourceVersion when inlined
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  resourceAPIVersion: string;
  /**
   * ResourceName is the name of the resource being requested for a \"get\" or deleted for a \"delete\"
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  resourceName: string;
  /**
   * Scopes to use for the evaluation.  Empty means \"use the unscoped (full) permissions of the user/groups\". Nil for a self-SAR, means \"use the scopes on this request\". Nil for a regular SAR, means the same as empty.
   * @type {Array<string>}
   * @memberof OSV1SubjectAccessReview
   */
  scopes: string[];
  /**
   * User is optional. If both User and Groups are empty, the current authenticated user is used.
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  user: string;
  /**
   * Verb is one of: get, list, watch, create, update, delete
   * @type {string}
   * @memberof OSV1SubjectAccessReview
   */
  verb: string;
}
