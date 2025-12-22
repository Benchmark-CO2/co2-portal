import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const articles = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		summary: z.string(),
		link: z.string(),
		authors: z.array(
				z.object({
						name: z.string(),
						thumbnail: z.string().optional(),
				})
		),
}),
});

const notices = defineCollection({
	// Load Markdown and MDX files in the `src/content/notices/` directory.
	loader: glob({ base: './src/content/notices', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
}),
});

const team = defineCollection({
	loader: glob({ base: './content/team', pattern: '*.json' }),
	schema: z.object({
		title: z.string().optional(),
		active: z.boolean().optional(),
		team: z.array(
			z.object({
				name: z.string(),
				role: z.string(),
				image: z.string()
			})
		),
		advisoryCommittee: z.array(
			z.object({
				name: z.string(),
				role: z.string(),
				image: z.string().optional(),
				photo: z.string().optional()
			})
		).optional(),
		stackeholders: z.array(
			z.object({
				name: z.string(),
				role: z.string(),
				image: z.string()
			})
		).optional(),
	})
})

export const collections = { blog, articles, notices, team };
