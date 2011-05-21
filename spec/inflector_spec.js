/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Inflector = (require('lib/natural/inflector')),
    inflector = new Inflector();

describe('inflector', function() {
    describe('singularization', function() {
        it('should drop an S by default', function() {
            expect(inflector.singularize('rrrs')).toBe('rrr');
            expect(inflector.singularize('hackers')).toBe('hacker');
            expect(inflector.singularize('movies')).toBe('movie');
        });
        
        it('should handle ambiguous form', function() {
            expect(inflector.singularize('deer')).toBe('deer');
            expect(inflector.singularize('fish')).toBe('fish');
            expect(inflector.singularize('series')).toBe('series');
            expect(inflector.singularize('sheep')).toBe('sheep');
            expect(inflector.singularize('trout')).toBe('trout');
        });
        
        it('should convert plurals ending SES to S', function() {
            expect(inflector.singularize('statuses')).toBe('status');
            expect(inflector.singularize('buses')).toBe('bus');
        });        
        
        it('should match irregulars', function() {
            expect(inflector.singularize('people')).toBe('person');
            expect(inflector.singularize('children')).toBe('child');
        });
        
        it('should handle IX cases', function() {
            expect(inflector.singularize('matrices')).toBe('matrix');
            expect(inflector.singularize('indices')).toBe('index');
            // our pluralizer won''t cause this form of appendix (appendicies)
            // but we should handle it
            expect(inflector.singularize('appendices')).toBe('appendix');
        });        
        
        it('should regulars to ES', function() {
            expect(inflector.singularize('churches')).toBe('church');
            expect(inflector.singularize('appendixes')).toBe('appendix');            
            expect(inflector.singularize('messes')).toBe('mess');
            expect(inflector.singularize('quizes')).toBe('quiz');
            expect(inflector.singularize('shoes')).toBe('shoe');
        });
        
        it('should handle SIS cases', function() {
            expect(inflector.singularize('synopses')).toBe('synopsis');
            expect(inflector.singularize('parentheses')).toBe('parenthesis');            
        });        

        it('should handle special OES cases', function() {
            expect(inflector.singularize('tomatoes')).toBe('tomato');
        });

        it('should handle I cases', function() {
            expect(inflector.singularize('octopi')).toBe('octopus');
        });
    });

    describe('pluralization', function() {
        it('should append an S by default', function() {
            expect(inflector.pluralize('rrr')).toBe('rrrs');
            expect(inflector.pluralize('hacker')).toBe('hackers');
            expect(inflector.pluralize('movie')).toBe('movies');
        });
        
        it('should handle ambiguous form', function() {
            expect(inflector.pluralize('deer')).toBe('deer');
            expect(inflector.pluralize('fish')).toBe('fish');
            expect(inflector.pluralize('series')).toBe('series');
            expect(inflector.pluralize('sheep')).toBe('sheep');
            expect(inflector.pluralize('trout')).toBe('trout');
        });
        
        it('should convert singulars ending s to ses', function() {
            expect(inflector.pluralize('status')).toBe('statuses');
            expect(inflector.pluralize('bus')).toBe('buses');
        });
        
        it('should match irregulars', function() {
            expect(inflector.pluralize('person')).toBe('people');
            expect(inflector.pluralize('child')).toBe('children');        
        });
        
        it('should handle IX cases', function() {
            expect(inflector.pluralize('matrix')).toBe('matrices');
            expect(inflector.pluralize('index')).toBe('indices');
        });        
        
        it('should regulars to ES', function() {
            expect(inflector.pluralize('church')).toBe('churches');
            expect(inflector.pluralize('appendix')).toBe('appendixes');
            expect(inflector.pluralize('mess')).toBe('messes');
            expect(inflector.pluralize('quiz')).toBe('quizes');
            expect(inflector.pluralize('shoe')).toBe('shoes');
        });
        
        it('should handle SIS cases', function() {
            expect(inflector.pluralize('synopsis')).toBe('synopses');
            expect(inflector.pluralize('parenthesis')).toBe('parentheses');            
        });
        
        it('should handle special OES cases', function() {
            expect(inflector.pluralize('tomato')).toBe('tomatoes');
        });

        it('should handle I cases', function() {
            expect(inflector.pluralize('octopus')).toBe('octopi');
        });
    });
    
    describe('should pluralize and singularize string from patch', function() {
        inflector.attach();
        expect('synopsis'.pluralize()).toBe('synopses');
        expect('synopses'.singularize()).toBe('synopsis');        
        expect('mess'.pluralize()).toBe('messes');
        expect('messes'.singularize()).toBe('mess');
    });

    describe('custom inflections', function() {
        describe('should pluralize and singularize custom forms', function() {
            var myInflector = new Inflector();
            myInflector.attach();
            myInflector.addPlural(/(code|ware)/, '$1z');
            myInflector.addSingular(/(code|ware)z/, '$1');
            expect('code'.pluralize()).toBe('codez');
            expect('codez'.singularize()).toBe('code');        
        });    
    });
});
