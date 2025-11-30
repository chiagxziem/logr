import { db } from "@repo/db";
import { project } from "@repo/db/schemas/project.schema";
import slugify from "slugify";

/**
 * Get all projects for a user
 * @param userId - The ID of the user
 * @returns An array of projects
 */
export const getProjectsForUser = async (userId: string) => {
  const projects = await db.query.project.findMany({
    where: (project, { eq }) => eq(project.userId, userId),
  });

  return projects;
};

/**
 * Create a new project for a user
 * @param name - Name of the project
 * @param userId - The ID of the user
 * @returns The created project
 */
export const createProjectForUser = async (name: string, userId: string) => {
  // Get user's projects
  const projects = await getProjectsForUser(userId);

  // Generate slug
  let slug = slugify(name, { lower: true, strict: true });
  let counter = 0;
  while (true) {
    const finalSlug = counter === 0 ? slug : `${slug}-${counter}`;
    const existingProject = projects.find((p) => p.slug === finalSlug);

    if (!existingProject) {
      slug = finalSlug;
      break;
    }
    counter++;
  }

  // Create project
  const [newProject] = await db
    .insert(project)
    .values({
      name,
      slug,
      userId,
    })
    .returning();

  return newProject;
};
