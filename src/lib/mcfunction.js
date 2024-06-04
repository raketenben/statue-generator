/*
Language: MCFunction
Author: FireBlast
Description: Highlight.js grammar for MCFunction
Category: scripting
*/

export default function (hljs) {
    return {
        name: 'MCFunction',
        aliases: ['mcfunction'],
        case_insensitive: true,
        contains: [
            {
                // Comment Heading (#>)
                className: 'comment',
                begin: /^\s*#>/,
                end: /$/,
                contains: [{ className: 'doctag', begin: /.+/ }],
                relevance: 5
            },
            {
                // Comment (#)
                className: 'comment',
                begin: /^\s*#.+/,
                relevance: 1
            },
            hljs.QUOTE_STRING_MODE, // String (quote)
            hljs.APOS_STRING_MODE, // String (apostrophe),
            {
                // UUID
                className: 'literal',
                begin: /[a-f0-9]+-[a-f0-9]+-[a-f0-9]+-[a-f0-9]+-[a-f0-9]+/,
                relevance: 15
            },
            {
                // Namespace
                //BUG: Can't use # or it turns into a comment
                className: 'symbol',
                begin: /[a-z0-9_]+:[a-z_][a-z0-9_/]+/,
                relevance: 15
            },
            {
                // Selector
                className: 'literal',
                begin: /@[parse]\b/,
                relevance: 10
            },
            {
                // Selector Text Option
                className: null,
                begin: /[a-z]+=/,
                end: /[\],\{]/,
                contains: [
                    {
                        // Number
                        className: 'number',
                        begin: /-?\d+(\.\d+)?/
                    },
                    {
                        // Namespace
                        className: 'symbol',
                        begin: /#?[a-z0-9_]+:[a-z_][a-z0-9_/]+/,
                        relevance: 10
                    },
                    {
                        // Boolean
                        className: 'literal',
                        begin: /\b(true|false)\b/
                    },
                    {
                        // String
                        className: 'string',
                        begin: /[a-z_0-9$]+/
                    }
                ],
                relevance: 2
            },
            {
                // Execute Run
                className: 'None',
                begin: /run /,
                end: / |$/,
                contains: [
                    {
                        className: 'keyword',
                        begin: /[a-z_0-9$]+/
                    }
                ],
                relevance: 5
            },
            {
                // Number
                className: 'number',
                variants: [
                    { begin: /-?\b(\.\d+|\d+(\.\d+)?)[bdfils]?/ }, //number
                    { begin: /[~^](-?\.\d+|\d+(\.\d+)?)?/ } //position
                ],
                relevance: 0
            },
            {
                // Boolean
                className: 'literal',
                begin: /\b(true|false)\b/,
                relevance: 0
            },
            {
                // Command
                className: 'keyword',
                begin: /^\s*[a-z]+/,
                relevance: 0
            }
        ]
    };
}
