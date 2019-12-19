# Markset

>
> I made this project right before I discovered a program called [Pandoc](https://pandoc.org/) which does what this project was aiming to do, but better.
> 
> I've also beaten my LaTeX-phobia since I started getting more and more familiar with the typesetting system.
>
> This project is deprecated. 
>

A simple **Markdown Typesetter** (probably a misnomer, but I'll go with it) for people who don't want to touch L<sup>A</sup>T<sub>E</sub>X with a 10 foot pole.

It's a simple command-line tool that converts your Markdown files to HTML (with some [snazzy themes](themes/)) and [some off-the-shelf plugins](data/plugins.json). All built on top of [markdown-it](https://markdown-it.github.io/markdown-it/).

This is not close to production-ready, but it's still somewhat usable.

## Installation

You know the routine.

```bash
(sudo) npm install -g markset
```

## Usage
```
Usage: markset [options] <filename>

Options:
  -V, --version           output the version number
  -t, --theme <name>      select a theme
      --list-themes       list available themes
  -o, --output <file>     output filename
  -s, --simple            use simple Markdown
  -h, --html-tags         enable HTML tags in source
  -x, --xhtml-out         use XHTML closing tags
  -b, --breaks            convert newlines to breaks (<br>)
  -l, --linkify           automatically detect links in text
  -T, --typographer       typographic improvements
  -q, --quotes <replace>  quote replacements (see man page)
  -h, --help              output usage information
```

## Themes

There are 4 themes available:

* [blank](themes/blank.html) &ndash; The minimum skeleton and not much more.
* [simple](themes/simple.html) &ndash; A simple theme meant to fit in with your platform.
* [nicer](thegreatrazz/nicer.html) &ndash; A more styled theme based on whatever I thought looked nice.
* none &ndash; Use this if you **only** want the raw HTML output.

## Markdown Extentions

Since markdown-it has support for plugins, I decided to include and enable some myself. If you want vanilla Markdown, you can use the `--simple` switch.

* Superscript (`^sup^`, <sup>sup</sup>, [plugin](https://github.com/markdown-it/markdown-it-sub))
* Subscript (`~sub~`, <sub>sub</sub>, [plugin](https://github.com/markdown-it/markdown-it-sup))
* Footnote (`^[Inline note]`, [plugin](https://github.com/markdown-it/markdown-it-footnote))
* Abbreviations (`*[HTML]: Hyper Text Markup Language`, [plugin]())
* Insertion (`++ins++`, <ins>ins</ins>, [plugin](https://github.com/markdown-it/markdown-it-ins))
* Marking (`==mark==`, <mark>mark</mark>, [plugin](https://github.com/markdown-it/markdown-it-mark))

## Why?

I made this for me to not faff around with thinks like StackEdit and GitHub Gists only for Markdown rendering, especially just simple for a reflection or answer sheet. Who do you think I am?

Commenting on LATEX, while it's good for maths heavy things... I much better prefer the readability for Markdown over it every day. Especially for non-equation heavy subjects like cybersecurity and engineering technology.

I'll see how useful it is by the time the holiday wraps up in a couple of weeks.

## Feature Wishlist

This isn't over. There are still features I'd like to implement someday. Ordered by priority (which in reality the opposite of what I'm likely to actually do).

* Syntax highlighting
* Dictionary linter (also known as a spell checker)
* Language intent parser (English only) &mdash; I found a project like this project interesting but can't find it anymore.
* More, better themes
* More modular and expandable design
* Language dependent quotations
* Make a sub-page for demos

If you've got any suggestions (or any good implementations of the aforementioned features), please submit an Issue or Pull Request and we'll talk things out from there.