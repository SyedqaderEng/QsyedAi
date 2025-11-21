import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

export interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  componentsCount: number;
  pages?: any[];
}

/**
 * Get all projects for a user
 */
export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        userId: data.userId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        componentsCount: data.componentsCount || 0,
        pages: data.pages || [],
      });
    });

    return projects;
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      return null;
    }

    const data = projectSnap.data();
    return {
      id: projectSnap.id,
      userId: data.userId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      componentsCount: data.componentsCount || 0,
      pages: data.pages || [],
    };
  } catch (error) {
    console.error('Error getting project:', error);
    throw new Error('Failed to fetch project');
  }
}

/**
 * Create a new project
 */
export async function createProject(
  userId: string,
  projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, {
      userId,
      name: projectData.name,
      slug: projectData.slug,
      description: projectData.description || '',
      thumbnail: projectData.thumbnail || '',
      componentsCount: projectData.componentsCount || 0,
      pages: projectData.pages || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

/**
 * Update a project
 */
export async function updateProject(
  projectId: string,
  updates: Partial<Omit<Project, 'id' | 'userId' | 'createdAt'>>
): Promise<void> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<void> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}

/**
 * Migrate localStorage projects to Firestore
 * This is a one-time migration function
 */
export async function migrateLocalStorageProjects(userId: string): Promise<void> {
  try {
    const localProjects = localStorage.getItem('projects');
    if (!localProjects) return;

    const projects = JSON.parse(localProjects);
    if (!Array.isArray(projects) || projects.length === 0) return;

    // Check if already migrated
    const existingProjects = await getUserProjects(userId);
    if (existingProjects.length > 0) {
      console.log('Projects already exist in Firestore, skipping migration');
      return;
    }

    // Migrate each project
    for (const project of projects) {
      await createProject(userId, {
        name: project.name,
        slug: project.slug,
        description: project.description,
        thumbnail: project.thumbnail,
        componentsCount: project.componentsCount || 0,
        pages: project.pages || [],
      });
    }

    console.log(`Migrated ${projects.length} projects to Firestore`);

    // Clear localStorage after successful migration
    localStorage.removeItem('projects');
  } catch (error) {
    console.error('Error migrating projects:', error);
    throw new Error('Failed to migrate projects from localStorage');
  }
}
