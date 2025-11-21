/**
 * PHASE 3.2: Database Operations for Projects
 *
 * Functions to save/load projects from Firestore
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { PageState, Project } from '@/lib/types/component';

/**
 * Save a project to Firestore
 */
export async function saveProject(project: Project, userId: string): Promise<void> {
  const projectRef = doc(db, 'projects', project.id);

  await setDoc(projectRef, {
    ...project,
    userId,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Load a project from Firestore
 */
export async function loadProject(projectId: string, userId: string): Promise<Project | null> {
  const projectRef = doc(db, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return null;
  }

  const data = projectSnap.data();

  // Verify ownership
  if (data.userId !== userId) {
    throw new Error('Unauthorized access to project');
  }

  return data as Project;
}

/**
 * Load all projects for a user
 */
export async function loadUserProjects(userId: string): Promise<Project[]> {
  const projectsRef = collection(db, 'projects');
  const q = query(
    projectsRef,
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Project);
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string, userId: string): Promise<void> {
  const projectRef = doc(db, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error('Project not found');
  }

  const data = projectSnap.data();

  // Verify ownership
  if (data.userId !== userId) {
    throw new Error('Unauthorized access to project');
  }

  await deleteDoc(projectRef);
}

/**
 * Update project metadata
 */
export async function updateProjectMetadata(
  projectId: string,
  userId: string,
  updates: Partial<Project>
): Promise<void> {
  const projectRef = doc(db, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error('Project not found');
  }

  const data = projectSnap.data();

  // Verify ownership
  if (data.userId !== userId) {
    throw new Error('Unauthorized access to project');
  }

  await updateDoc(projectRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}
