#!/usr/bin/env node

// Take time (just for fun)
let startTime = Date.now()

const fs = require('fs')
const path = require('path')
const program = require('commander')

let input

program
  .version('0.0.0')
  .arguments('<filename>')
  .action(filename => {
    input = filename
  })

  // Markset options
  .option('-t, --theme <name>', 'select a theme')
  .option('    --list-themes', 'list available themes')
  .option('-o, --output <file>', 'output filename')
  .option('-s, --simple', 'use simple Markdown')

  // Markdown-it options
  .option('-h, --html-tags', 'enable HTML tags in source')
  .option('-x, --xhtml-out', 'use XHTML closing tags')
  .option('-b, --breaks', 'convert newlines to breaks (<br>)')
  .option('-l, --linkify', 'automatically detect links in text')
  .option('-T, --typographer', 'typographic improvements')
  .option('-q, --quotes <replace>', 'quote replacements (see man page)')

  .parse(process.argv)

if (input === undefined) program.help()
if (program.listThemes) {
  console.error('Stub: Theme list is not implemented.')
  console.error('There is only one "none."')
  process.exit(0)
}

// Create the markdown renderer
let theme = program.theme || 'simple'
let output = program.output ||
  path.join(path.dirname(input),
    path.basename(input, path.extname(input)) + '.html')

// Load the theme now so we don't cause embarrasement
let template
if (theme !== 'none') {
  try {
    template = fs.readFileSync(
      path.join(__dirname, '..', 'themes', `${theme}.html`))
  } catch (ex) {
    console.error(ex)
    process.exit(2)
  }
}

// Create markdown renderer
let md = require('markdown-it')({
  html: program.htmlTags || false,
  xhtmlOut: program.xhtmlOut || false,
  breaks: program.breaks || false,
  linkify: program.linkify || false,
  typographer: program.typographer || false,
  quotes: program.quotes || '“”‘’'
})

// Add the plugins for non-simple Markdown
if (!(program.simple || false)) {
  md.use(require('markdown-it-sub'))
  md.use(require('markdown-it-sup'))
  md.use(require('markdown-it-footnote'))
  md.use(require('markdown-it-abbr'))
  md.use(require('markdown-it-ins'))
  md.use(require('markdown-it-mark'))
}

// Load the file and parse it to HTML
let mdFile
try {
  mdFile = fs.readFileSync(input, { encoding: 'utf8' })
} catch (ex) {
  console.error('A critical error occured.')
  console.error(ex)
}

// HTML output
let htmlOutput = md.render(mdFile)

if (theme !== 'none') {
  // Load cheerio
  const $ = require('cheerio').load(template)

  // Add the output into the template and save it
  $('body').html(htmlOutput)
  htmlOutput = $.html()
}

// Done. Dump to disk.
fs.writeFileSync(output, htmlOutput)
console.log(`Done: ${path.basename(output)} typeset in ${(Date.now() - startTime) / 1000}s.`)
