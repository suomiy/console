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

import { OSV1ScopeRestriction } from './OSV1ScopeRestriction';
import { V1ObjectMeta } from './V1ObjectMeta';

/**
 * OAuthClient describes an OAuth client
 * @export
 * @interface OSV1OAuthClient
 */
export interface OSV1OAuthClient {
  /**
   * AccessTokenInactivityTimeoutSeconds overrides the default token inactivity timeout for tokens granted to this client. The value represents the maximum amount of time that can occur between consecutive uses of the token. Tokens become invalid if they are not used within this temporal window. The user will need to acquire a new token to regain access once a token times out. This value needs to be set only if the default set in configuration is not appropriate for this client. Valid values are: - 0: Tokens for this client never time out - X: Tokens time out if there is no activity for X seconds The current minimum allowed value for X is 300 (5 minutes)
   * @type {number}
   * @memberof OSV1OAuthClient
   */
  accessTokenInactivityTimeoutSeconds?: number;
  /**
   * AccessTokenMaxAgeSeconds overrides the default access token max age for tokens granted to this client. 0 means no expiration.
   * @type {number}
   * @memberof OSV1OAuthClient
   */
  accessTokenMaxAgeSeconds?: number;
  /**
   * AdditionalSecrets holds other secrets that may be used to identify the client.  This is useful for rotation and for service account token validation
   * @type {Array<string>}
   * @memberof OSV1OAuthClient
   */
  additionalSecrets?: string[];
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   * @type {string}
   * @memberof OSV1OAuthClient
   */
  apiVersion?: string;
  /**
   * GrantMethod determines how to handle grants for this client. If no method is provided, the cluster default grant handling method will be used. Valid grant handling methods are:  - auto:   always approves grant requests, useful for trusted clients  - prompt: prompts the end user for approval of grant requests, useful for third-party clients  - deny:   always denies grant requests, useful for black-listed clients
   * @type {string}
   * @memberof OSV1OAuthClient
   */
  grantMethod?: string;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   * @type {string}
   * @memberof OSV1OAuthClient
   */
  kind?: string;
  /**
   *
   * @type {V1ObjectMeta}
   * @memberof OSV1OAuthClient
   */
  metadata?: V1ObjectMeta;
  /**
   * RedirectURIs is the valid redirection URIs associated with a client
   * @type {Array<string>}
   * @memberof OSV1OAuthClient
   */
  redirectURIs?: string[];
  /**
   * RespondWithChallenges indicates whether the client wants authentication needed responses made in the form of challenges instead of redirects
   * @type {boolean}
   * @memberof OSV1OAuthClient
   */
  respondWithChallenges?: boolean;
  /**
   * ScopeRestrictions describes which scopes this client can request.  Each requested scope is checked against each restriction.  If any restriction matches, then the scope is allowed. If no restriction matches, then the scope is denied.
   * @type {Array<OSV1ScopeRestriction>}
   * @memberof OSV1OAuthClient
   */
  scopeRestrictions?: OSV1ScopeRestriction[];
  /**
   * Secret is the unique secret associated with a client
   * @type {string}
   * @memberof OSV1OAuthClient
   */
  secret?: string;
}
