## Obsidian Smart Tags

This plugin introduces:

1. **Tag Enumerations**: Command-click tags to cycle through them (e.g., `#now`, `#later`, `#done` if you like Logseq).
2. **Tag Aliases**: Use shorthands like `#📕` for `#book`, or `#AI` for `#Science/Formal/InformationScience/ArtificialIntelligence` (Useful if you're using your tags as [informal facets to classify your cards](https://en.wikipedia.org/wiki/Faceted_classification)).
3. **Tag Types** (in combination with [Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview)): use `#book` as a synonym for an inline attribute like `(type:: book)`.

It works well in combination with [TagFolder](https://github.com/vrtmrz/obsidian-tagfolder) and [Dataview](https://github.com/blacksmithgu/obsidian-dataview).

### Tags enumerations

**Example**. I mark my tasks with `#m`, `#s`, `#c` (as in [MoSCoW prioritization](https://www.productplan.com/glossary/moscow-prioritization/)) combined with a number for extra specificity: `#m1`, `#m2`, `#m3`....

In a `tagsConfig.json`, I write the following:

```json
{
	...
	"enumerations": {
		"primary": [
			[
				"m1",
				"m2",
				"m3"
			],
			[
				"s1",
				"s2",
				"s3"
			],
			[
				"c1",
				"c2",
				"c3"
			]
		],
		"secondary": [
			[
				"m1",
				"s1",
				"c1"
			],
			[
				"m2",
				"s2",
				"c2"
			],
			[
				"m3",
				"s3",
				"c3"
			]
		]
	},
	...
}
```

My primary key-click combination (default: `cmd + click`) will cycle through the granular priority levels (`#m1`, `#m2`...). My secondary key-click combination (default: `ctrl + click`) will cycle through the priority categories (`#m1`, `s1`...). By default, pressing `shift` while using either of these combinations will cycle in the reverse order.

### Tag aliases

If you're a fan of the emoji hype, you might want to be able to use the shorthand `#📕` for `#book` , `#🎬` for `#movie`. Obsidian should know these refer to the same underlying idea.

In your `tagsConfig.json`:

```json
{
	...
	"aliases": {
		"book": [
			"📕"
		],
		"movie": [
			"🎬"
		],
		"science": [
			"💭",
			"Sciences",
			"Science",
			"sciences"
		]
	},
	...
}
```

This uses a dictionary structure because we have to specify a "primary" key (`book`, `movie`...) for each set of aliases. Just like note aliases, tag aliases are saved with the pipe operator (`|`) as `#tag|some-alias`.

### Semantic tags

If you're familiar with [Obsidian dataview](https://github.com/blacksmithgu/obsidian-dataview), you might prefer using more structured inline attributes like `(type:: movie)` and `(priority:: m1)` over tags. This is a really powerful feature. The only downside is that it's a bit lengthy to write out every time.

An easier alternative would be to treat `#tag` as a shorthand for `(<tag-type>:: tag)`, where `<tag-type>` is inferred from a predetermined list of tags. E.g.: `#movie` for `(type:: movie)`, and `#m1` for `(priority:: m1)`. You would specify ahead of time that `type` can be one of `movie`, `book`, `article`, `essay`... and `priority` one of `m1`, `m2`, `m3`, `s1`,....

Just pull up your `tagsConfig.json`:

```json
{
	...
	"types": {
		"types": [
			"book",
			"movie",
			...
		],
		"subjects": [
			"science",
			"social-sciences",
			...
		]
	},
	...
}
```

---

# Status

- [ ] Tag Enumerations
- [ ] Tag Aliases
- [ ] Tag Typings
- [ ] TagFolder integration
