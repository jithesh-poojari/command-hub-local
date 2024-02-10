import { z } from "zod";

// Define your constant lists
export const categoryList = [
  "package manager",
  "version control",
  "containerization",
] as const;

export const packageManagerList = ["npm", "yarn", "pnpm", "bun", "pip", "composer", "gem", "conda", "nuget", "brew", "choco", "scoop"] as const;
export const frameworkList = ["next", "react", "vue", "django", "rails", "express", "flask", "laravel", "spring boot", "asp.net", "symfony", "meteor"] as const;
export const versionControlList = ["git", "svn", "mercurial", "perforce", "bazaar", "tfs", "cvs", "darcs", "fossil", "plastic scm", "monotone", "bitbucket"] as const;
export const containerizationList = ["docker", "kubernetes", "podman", "openshift", "rkt", "lxc", "containerd", "garden", "cri-o", "mesos", "singularity"] as const;

// Define your command form schema
export const commandFormSchema = z.object({
  usage: z.string().refine((data) => data.trim() !== "", {
    message: "Please provide a usage for the command.",
  }),
  name: z.string().refine((data) => data.trim() !== "", {
    message: "Please enter a name for the command.",
  }),
  description: z.string().optional(),
  category: z.object({
    type: z
      .enum(categoryList)
      .nullable()
      .refine((data) => data !== null, {
        message: "Please select a category for the command.",
      }),
    options: z.object({
      package_manager: z
        .object({
          pm_type: z.enum(packageManagerList).optional(),
          framework: z.enum(frameworkList).optional(),
        })
        .optional(),
      version_control: z.enum(versionControlList).optional(),
      containerization: z.enum(containerizationList).optional(),
    }),
  }),
});

// Define the type for command form values
export type CommandFormValues = z.infer<typeof commandFormSchema>;
