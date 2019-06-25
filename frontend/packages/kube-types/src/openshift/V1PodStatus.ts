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

import { V1ContainerStatus } from './V1ContainerStatus';
import { V1PodCondition } from './V1PodCondition';

/**
 * PodStatus represents information about the status of a pod. Status may trail the actual state of a system, especially if the node that hosts the pod cannot contact the control plane.
 * @export
 * @interface V1PodStatus
 */
export interface V1PodStatus {
  /**
   * Current service state of pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
   * @type {Array<V1PodCondition>}
   * @memberof V1PodStatus
   */
  conditions?: V1PodCondition[];
  /**
   * The list has one entry per container in the manifest. Each entry is currently the output of `docker inspect`. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status
   * @type {Array<V1ContainerStatus>}
   * @memberof V1PodStatus
   */
  containerStatuses?: V1ContainerStatus[];
  /**
   * IP address of the host to which the pod is assigned. Empty if not yet scheduled.
   * @type {string}
   * @memberof V1PodStatus
   */
  hostIP?: string;
  /**
   * The list has one entry per init container in the manifest. The most recent successful init container will have ready = true, the most recently started container will have startTime set. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status
   * @type {Array<V1ContainerStatus>}
   * @memberof V1PodStatus
   */
  initContainerStatuses?: V1ContainerStatus[];
  /**
   * A human readable message indicating details about why the pod is in this condition.
   * @type {string}
   * @memberof V1PodStatus
   */
  message?: string;
  /**
   * nominatedNodeName is set only when this pod preempts other pods on the node, but it cannot be scheduled right away as preemption victims receive their graceful termination periods. This field does not guarantee that the pod will be scheduled on this node. Scheduler may decide to place the pod elsewhere if other nodes become available sooner. Scheduler may also decide to give the resources on this node to a higher priority pod that is created after preemption. As a result, this field may be different than PodSpec.nodeName when the pod is scheduled.
   * @type {string}
   * @memberof V1PodStatus
   */
  nominatedNodeName?: string;
  /**
   * The phase of a Pod is a simple, high-level summary of where the Pod is in its lifecycle. The conditions array, the reason and message fields, and the individual container status arrays contain more detail about the pod\'s status. There are five possible phase values:  Pending: The pod has been accepted by the Kubernetes system, but one or more of the container images has not been created. This includes time before being scheduled as well as time spent downloading images over the network, which could take a while. Running: The pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting. Succeeded: All containers in the pod have terminated in success, and will not be restarted. Failed: All containers in the pod have terminated, and at least one container has terminated in failure. The container either exited with non-zero status or was terminated by the system. Unknown: For some reason the state of the pod could not be obtained, typically due to an error in communicating with the host of the pod.  More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-phase
   * @type {string}
   * @memberof V1PodStatus
   */
  phase?: string;
  /**
   * IP address allocated to the pod. Routable at least within the cluster. Empty if not yet allocated.
   * @type {string}
   * @memberof V1PodStatus
   */
  podIP?: string;
  /**
   * The Quality of Service (QOS) classification assigned to the pod based on resource requirements See PodQOSClass type for available QOS classes More info: https://git.k8s.io/community/contributors/design-proposals/node/resource-qos.md
   * @type {string}
   * @memberof V1PodStatus
   */
  qosClass?: string;
  /**
   * A brief CamelCase message indicating details about why the pod is in this state. e.g. \'Evicted\'
   * @type {string}
   * @memberof V1PodStatus
   */
  reason?: string;
  /**
   *
   * @type {string}
   * @memberof V1PodStatus
   */
  startTime?: string;
}
