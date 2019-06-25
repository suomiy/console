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

import { V1beta1DeploymentStrategy } from './V1beta1DeploymentStrategy';
import { V1beta1RollbackConfig } from './V1beta1RollbackConfig';
import { V1PodTemplateSpec } from './V1PodTemplateSpec';
import { V1LabelSelector } from './V1LabelSelector';

/**
 * DeploymentSpec is the specification of the desired behavior of the Deployment.
 * @export
 * @interface V1beta1DeploymentSpec
 */
export interface V1beta1DeploymentSpec {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   * @type {number}
   * @memberof V1beta1DeploymentSpec
   */
  minReadySeconds?: number;
  /**
   * Indicates that the deployment is paused.
   * @type {boolean}
   * @memberof V1beta1DeploymentSpec
   */
  paused?: boolean;
  /**
   * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.
   * @type {number}
   * @memberof V1beta1DeploymentSpec
   */
  progressDeadlineSeconds?: number;
  /**
   * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   * @type {number}
   * @memberof V1beta1DeploymentSpec
   */
  replicas?: number;
  /**
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 2.
   * @type {number}
   * @memberof V1beta1DeploymentSpec
   */
  revisionHistoryLimit?: number;
  /**
   *
   * @type {V1beta1RollbackConfig}
   * @memberof V1beta1DeploymentSpec
   */
  rollbackTo?: V1beta1RollbackConfig;
  /**
   *
   * @type {V1LabelSelector}
   * @memberof V1beta1DeploymentSpec
   */
  selector?: V1LabelSelector;
  /**
   *
   * @type {V1beta1DeploymentStrategy}
   * @memberof V1beta1DeploymentSpec
   */
  strategy?: V1beta1DeploymentStrategy;
  /**
   *
   * @type {V1PodTemplateSpec}
   * @memberof V1beta1DeploymentSpec
   */
  template: V1PodTemplateSpec;
}
