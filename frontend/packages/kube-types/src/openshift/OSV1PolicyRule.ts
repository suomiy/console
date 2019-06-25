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
 * PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.
 * @export
 * @interface OSV1PolicyRule
 */
export interface OSV1PolicyRule {
  /**
   * APIGroups is the name of the APIGroup that contains the resources.  If this field is empty, then both kubernetes and origin API groups are assumed. That means that if an action is requested against one of the enumerated resources in either the kubernetes or the origin API group, the request will be allowed
   * @type {Array<string>}
   * @memberof OSV1PolicyRule
   */
  apiGroups: string[];
  /**
   *
   * @type {IoK8sApimachineryPkgRuntimeRawExtension}
   * @memberof OSV1PolicyRule
   */
  attributeRestrictions?: IoK8sApimachineryPkgRuntimeRawExtension;
  /**
   * NonResourceURLsSlice is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path This name is intentionally different than the internal type so that the DefaultConvert works nicely and because the ordering may be different.
   * @type {Array<string>}
   * @memberof OSV1PolicyRule
   */
  nonResourceURLs?: string[];
  /**
   * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
   * @type {Array<string>}
   * @memberof OSV1PolicyRule
   */
  resourceNames?: string[];
  /**
   * Resources is a list of resources this rule applies to.  ResourceAll represents all resources.
   * @type {Array<string>}
   * @memberof OSV1PolicyRule
   */
  resources: string[];
  /**
   * Verbs is a list of Verbs that apply to ALL the ResourceKinds and AttributeRestrictions contained in this rule.  VerbAll represents all kinds.
   * @type {Array<string>}
   * @memberof OSV1PolicyRule
   */
  verbs: string[];
}
