/// <reference path="android-declarations.d.ts"/>

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class AnyOfError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.AnyOfError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public constructor(param0: java.net.URI, param1: any, param2: java.util.List<java.util.List<net.jimblackler.jsonschemafriend.ValidationError>>, param3: net.jimblackler.jsonschemafriend.Schema);
				public getAllErrors(): java.util.List<java.util.List<net.jimblackler.jsonschemafriend.ValidationError>>;
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class CacheLoader extends net.jimblackler.jsonschemafriend.Loader {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.CacheLoader>;
				public load(param0: java.net.URI, param1: boolean): string;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class CachedRegExPatternSupplier extends net.jimblackler.jsonschemafriend.RegExPatternSupplier {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.CachedRegExPatternSupplier>;
				public newPattern(param0: string): net.jimblackler.jsonschemafriend.RegExPattern;
				public constructor(param0: net.jimblackler.jsonschemafriend.RegExPatternSupplier);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class CombinedSchema {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.CombinedSchema>;
				public getInferredTypes(): java.util.Collection<string>;
				public getNonProhibitedTypes(): java.util.Collection<string>;
				public getProperties(): java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>;
				public getExplicitTypes(): java.util.Collection<string>;
				public getEnums(): java.util.Collection<any>;
				public constructor(param0: net.jimblackler.jsonschemafriend.Schema);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ComparableNull {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ComparableNull>;
				public equals(param0: any): boolean;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ComparableUtils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ComparableUtils>;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ConstError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ConstError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ContentEncodingError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ContentEncodingError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema, param3: string);
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class DependencyError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.DependencyError>;
				public getProperty(): string;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getDependency(): string;
				public getMessage(): string;
				public constructor(param0: java.net.URI, param1: any, param2: string, param3: string, param4: net.jimblackler.jsonschemafriend.Schema);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class DisallowError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.DisallowError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class DivisibleByError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.DivisibleByError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class EnumError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.EnumError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ExclusiveMaximumError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ExclusiveMaximumError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ExclusiveMinimumError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ExclusiveMinimumError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class FalseSchemaError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.FalseSchemaError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class FormatChecker {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.FormatChecker>;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class FormatError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.FormatError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema, param3: string);
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class GenerationException extends net.jimblackler.jsonschemafriend.SchemaException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.GenerationException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class InvalidRegexException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.InvalidRegexException>;
				public constructor(param0: java.lang.Exception);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class JavaRegExPattern extends net.jimblackler.jsonschemafriend.RegExPattern {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.JavaRegExPattern>;
				public matches(param0: string): boolean;
				public toString(): string;
				public constructor(param0: string);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class JoniRegExPattern extends net.jimblackler.jsonschemafriend.RegExPattern {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.JoniRegExPattern>;
				public matches(param0: string): boolean;
				public toString(): string;
				public constructor(param0: string);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class Keywords {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.Keywords>;
				public static get(param0: string): void;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class ListValidationException extends net.jimblackler.jsonschemafriend.ValidationException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ListValidationException>;
				public getErrors(): java.util.Collection<net.jimblackler.jsonschemafriend.ValidationError>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.util.Collection<net.jimblackler.jsonschemafriend.ValidationError>);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class Loader {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.Loader>;
				/**
				 * Constructs a new instance of the net.jimblackler.jsonschemafriend.Loader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					load(param0: java.net.URI, param1: boolean): string;
				});
				public constructor();
				public load(param0: java.net.URI, param1: boolean): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MaxContainsError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MaxContainsError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MaxItemsError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MaxItemsError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MaxLengthError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MaxLengthError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MaxPropertiesError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MaxPropertiesError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MaximumError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MaximumError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDetector {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDetector>;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft03 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft03>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft04 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft04>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft06 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft06>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft07 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft07>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft201909 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft201909>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaDraft202012 {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaDraft202012>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MetaSchemaUris {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MetaSchemaUris>;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MinContainsError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MinContainsError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MinItemsError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MinItemsError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MinLengthError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MinLengthError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MinPropertiesError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MinPropertiesError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MinimumError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MinimumError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MissingPathException extends net.jimblackler.jsonschemafriend.SchemaException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MissingPathException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MissingPropertyError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MissingPropertyError>;
				public getProperty(): string;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
				public constructor(param0: java.net.URI, param1: any, param2: string, param3: net.jimblackler.jsonschemafriend.Schema);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class MultipleError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.MultipleError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class NotError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.NotError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class OneOfError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.OneOfError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getPassed(): java.util.List<net.jimblackler.jsonschemafriend.Schema>;
				public getAllErrors(): java.util.List<java.util.List<net.jimblackler.jsonschemafriend.ValidationError>>;
				public getMessage(): string;
				public constructor(param0: java.net.URI, param1: any, param2: java.util.List<net.jimblackler.jsonschemafriend.Schema>, param3: java.util.List<java.util.List<net.jimblackler.jsonschemafriend.ValidationError>>, param4: net.jimblackler.jsonschemafriend.Schema);
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class PathUtils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.PathUtils>;
				public static ESCAPED_EMPTY: string;
				public static getParent(param0: java.net.URI): java.net.URI;
				public static append(param0: java.net.URI, param1: string): java.net.URI;
				public static fetchFromPath(param0: any, param1: string): any;
				public static deleteAtPath(param0: any, param1: string): void;
				public static modifyAtPath(param0: any, param1: string, param2: any): any;
				public constructor();
				public static fixUnescaped(param0: string): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class PatternError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.PatternError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class RegExPattern {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.RegExPattern>;
				/**
				 * Constructs a new instance of the net.jimblackler.jsonschemafriend.RegExPattern interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					matches(param0: string): boolean;
				});
				public constructor();
				public matches(param0: string): boolean;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class RegExPatternSupplier {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.RegExPatternSupplier>;
				/**
				 * Constructs a new instance of the net.jimblackler.jsonschemafriend.RegExPatternSupplier interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					newPattern(param0: string): net.jimblackler.jsonschemafriend.RegExPattern;
				});
				public constructor();
				public newPattern(param0: string): net.jimblackler.jsonschemafriend.RegExPattern;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class Schema {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.Schema>;
				public getMaxContains(): java.lang.Number;
				public getAllOf(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public getExamples(): java.util.List<any>;
				public getNot(): net.jimblackler.jsonschemafriend.Schema;
				public getDefault(): any;
				public isUniqueItems(): boolean;
				public getMinimum(): java.lang.Number;
				public getDependentSchemas(): java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>;
				public getUri(): java.net.URI;
				public getUnevaluatedProperties(): net.jimblackler.jsonschemafriend.Schema;
				public getPrefixItems(): java.util.List<net.jimblackler.jsonschemafriend.Schema>;
				public getDisallowSchemas(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public getExclusiveMaximum(): java.lang.Number;
				public isExclusiveMinimumBoolean(): boolean;
				public getMaxItems(): java.lang.Number;
				public hashCode(): number;
				public validateExamples(param0: net.jimblackler.jsonschemafriend.Validator, param1: any /* any*/): void;
				public getUnevaluatedItems(): net.jimblackler.jsonschemafriend.Schema;
				public getEnums(): java.util.List<any>;
				public equals(param0: any): boolean;
				public getContentEncoding(): string;
				public getExplicitTypes(): java.util.Collection<string>;
				public getPatternPropertiesPatterns(): java.util.Collection<string>;
				public getDynamicAnchorsInResource(): java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>;
				public getDynamicAnchor(): string;
				public getExclusiveMinimum(): java.lang.Number;
				public getDivisibleBy(): java.lang.Number;
				public isRecursiveAnchor(): boolean;
				public getResourceUri(): any;
				public getProperties(): java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>;
				public getPattern(): string;
				public toString(): string;
				public getContains(): net.jimblackler.jsonschemafriend.Schema;
				public getItemsTuple(): java.util.List<net.jimblackler.jsonschemafriend.Schema>;
				public getContentMediaType(): string;
				public getRef(): net.jimblackler.jsonschemafriend.Schema;
				public getIf(): net.jimblackler.jsonschemafriend.Schema;
				public getRecursiveRef(): net.jimblackler.jsonschemafriend.Schema;
				public getMinContains(): java.lang.Number;
				public getDynamicRefURI(): java.net.URI;
				public getConst(): any;
				public setParent(param0: net.jimblackler.jsonschemafriend.Schema): void;
				public getPropertyNames(): net.jimblackler.jsonschemafriend.Schema;
				public getDescription(): string;
				public isFalse(): java.lang.Boolean;
				public getMaxLength(): java.lang.Number;
				public getAdditionalItems(): net.jimblackler.jsonschemafriend.Schema;
				public getAdditionalProperties(): net.jimblackler.jsonschemafriend.Schema;
				public getTypesSchema(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public getSubSchemas(): java.util.Map<java.net.URI,net.jimblackler.jsonschemafriend.Schema>;
				public getMaxProperties(): java.lang.Number;
				public getPatternPropertiesSchema(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public getDependentRequired(): java.util.Map<string,java.util.Collection<string>>;
				public getMinItems(): java.lang.Number;
				public getFormat(): string;
				public getMetaSchema(): java.net.URI;
				public isRequired(): boolean;
				public validateExamplesRecursive(param0: net.jimblackler.jsonschemafriend.Validator, param1: any /* any*/): void;
				public getOneOf(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public isExclusiveMaximumBoolean(): boolean;
				public getItems(): net.jimblackler.jsonschemafriend.Schema;
				public getRequiredProperties(): java.util.Collection<string>;
				public getAnyOf(): java.util.Collection<net.jimblackler.jsonschemafriend.Schema>;
				public getMinProperties(): java.lang.Number;
				public getTitle(): string;
				public getMinLength(): java.lang.Number;
				public getElse(): net.jimblackler.jsonschemafriend.Schema;
				public getMaximum(): java.lang.Number;
				public getDisallow(): java.util.Collection<string>;
				public hasConst(): boolean;
				public getThen(): net.jimblackler.jsonschemafriend.Schema;
				public getDefaultDynamicRef(): net.jimblackler.jsonschemafriend.Schema;
				public getParent(): net.jimblackler.jsonschemafriend.Schema;
				public getSchemaObject(): any;
				public getMultipleOf(): java.lang.Number;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export abstract class SchemaException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.SchemaException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class SchemaStore {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.SchemaStore>;
				public loadSchema(param0: any, param1: net.jimblackler.jsonschemafriend.Validator): net.jimblackler.jsonschemafriend.Schema;
				public canonicalUriToResourceUri(param0: java.net.URI): java.net.URI;
				public constructor(param0: boolean);
				public loadSchema(param0: java.net.URI): net.jimblackler.jsonschemafriend.Schema;
				public register(param0: java.net.URI, param1: net.jimblackler.jsonschemafriend.Schema): void;
				public loadSchema(param0: java.net.URL, param1: net.jimblackler.jsonschemafriend.Validator, param2: any /* any*/): net.jimblackler.jsonschemafriend.Schema;
				public loadSchema(param0: java.io.InputStream): net.jimblackler.jsonschemafriend.Schema;
				public constructor(param0: net.jimblackler.jsonschemafriend.UrlRewriter, param1: boolean);
				public constructor();
				public loadSchema(param0: any): net.jimblackler.jsonschemafriend.Schema;
				public constructor(param0: net.jimblackler.jsonschemafriend.UrlRewriter);
				public loadSchema(param0: java.io.File): net.jimblackler.jsonschemafriend.Schema;
				public constructor(param0: net.jimblackler.jsonschemafriend.UrlRewriter, param1: net.jimblackler.jsonschemafriend.Loader);
				public loadSchemaJson(param0: string): net.jimblackler.jsonschemafriend.Schema;
				public loadSchema(param0: java.net.URI, param1: net.jimblackler.jsonschemafriend.Validator): net.jimblackler.jsonschemafriend.Schema;
				public loadSchema(param0: java.net.URL): net.jimblackler.jsonschemafriend.Schema;
				public loadSchema(param0: java.net.URI, param1: net.jimblackler.jsonschemafriend.Validator, param2: any /* any*/): net.jimblackler.jsonschemafriend.Schema;
				public getDynamicAnchorsForSchemaResource(param0: java.net.URI): java.util.Set<string>;
				public store(param0: java.net.URI, param1: any): java.net.URI;
				public constructor(param0: net.jimblackler.jsonschemafriend.UrlRewriter, param1: boolean, param2: net.jimblackler.jsonschemafriend.Loader);
				public constructor(param0: net.jimblackler.jsonschemafriend.Loader);
				public getBaseObject(param0: java.net.URI): any;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class StandardGenerationException extends net.jimblackler.jsonschemafriend.GenerationException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.StandardGenerationException>;
				public constructor(param0: java.util.Map<string,any>);
				public getStandardOutput(): java.util.Map<string,any>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class StandardValidationException extends net.jimblackler.jsonschemafriend.ValidationException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.StandardValidationException>;
				public constructor(param0: java.util.Map<string,any>);
				public getStandardOutput(): java.util.Map<string,any>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public toString(): string;
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class StreamUtils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.StreamUtils>;
				public static streamToString(param0: java.io.InputStream): string;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class TypeDisallowedError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.TypeDisallowedError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public constructor(param0: java.net.URI, param1: any, param2: java.util.Collection<string>, param3: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class TypeError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.TypeError>;
				public getFoundTypes(): java.util.Collection<string>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getExpectedTypes(): java.util.Collection<string>;
				public constructor(param0: java.net.URI, param1: any, param2: java.util.Collection<string>, param3: java.util.Collection<string>, param4: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class TypeInferrer {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.TypeInferrer>;
				public static getNonProhibitedTypes(param0: net.jimblackler.jsonschemafriend.Schema): java.util.Collection<string>;
				public static inferTypes(param0: net.jimblackler.jsonschemafriend.Schema): java.util.Collection<string>;
				public static inferTypesNonEmpty(param0: net.jimblackler.jsonschemafriend.Schema): java.util.Collection<string>;
				public constructor();
				public static getNonProhibitedTypes(param0: net.jimblackler.jsonschemafriend.CombinedSchema): java.util.Collection<string>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class UnexpectedTypeError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.UnexpectedTypeError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public constructor(param0: java.net.URI, param1: any, param2: any, param3: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class UniqueItemsError extends net.jimblackler.jsonschemafriend.ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.UniqueItemsError>;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class UriUtils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.UriUtils>;
				public constructor();
				public static withoutFragment(param0: java.net.URI): java.net.URI;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class UrlRewriter {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.UrlRewriter>;
				/**
				 * Constructs a new instance of the net.jimblackler.jsonschemafriend.UrlRewriter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					rewrite(param0: java.net.URI): java.net.URI;
				});
				public constructor();
				public rewrite(param0: java.net.URI): java.net.URI;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class UrlUtils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.UrlUtils>;
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class Utils {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.Utils>;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export abstract class ValidationError {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ValidationError>;
				public getDocument(): any;
				public constructor(param0: java.net.URI, param1: any, param2: net.jimblackler.jsonschemafriend.Schema);
				public getObject(): any;
				public getSchema(): net.jimblackler.jsonschemafriend.Schema;
				public getUri(): java.net.URI;
				public static truncate(param0: string, param1: number): string;
				public toString(): string;
				public getMessage(): string;
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export abstract class ValidationException extends net.jimblackler.jsonschemafriend.SchemaException {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.ValidationException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
			}
		}
	}
}

declare module net {
	export module jimblackler {
		export module jsonschemafriend {
			export class Validator {
				public static class: java.lang.Class<net.jimblackler.jsonschemafriend.Validator>;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.net.URL): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any, param2: java.net.URI): void;
				public constructor(param0: net.jimblackler.jsonschemafriend.RegExPatternSupplier, param1: any /* any*/, param2: boolean);
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any, param2: java.net.URI, param3: any /* any*/, param4: java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.net.URL, param2: any /* any*/): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any): void;
				public constructor(param0: net.jimblackler.jsonschemafriend.RegExPatternSupplier, param1: any /* any*/);
				public validateWithOutput(param0: net.jimblackler.jsonschemafriend.Schema, param1: any): java.util.Map<string,any>;
				public constructor(param0: boolean);
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.io.File, param2: any /* any*/): void;
				public constructor(param0: any /* any*/);
				public constructor();
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.net.URI, param2: any /* any*/): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.io.File): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any, param2: java.net.URI, param3: any /* any*/): void;
				public validateJson(param0: net.jimblackler.jsonschemafriend.Schema, param1: string): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.net.URI): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any, param2: any /* any*/): void;
				public static getObject(param0: any, param1: java.net.URI): any;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: java.io.InputStream): void;
				public validate(param0: net.jimblackler.jsonschemafriend.Schema, param1: any, param2: java.net.URI, param3: any /* any*/, param4: any /* any*/, param5: any /* any*/, param6: java.util.Map<string,net.jimblackler.jsonschemafriend.Schema>): void;
			}
		}
	}
}

//Generics information:

