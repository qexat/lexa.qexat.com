/**
 * Implementation (albeit incomplete) of the maybe monad.
 */

/** @private 
    @template T
    @typedef
    { {tag: "Some", value: T}
    | {tag: "Nothing"}
    } MaybeType<T>
 */

/**
 * @template T
 * The maybe monad.
 */
export class Maybe {
  /**
   * @param {MaybeType<T>} underlying
   */
  constructor(underlying) {
    /**
     * @private
     */
    this.underlying = underlying;
  }

  /**
   * Apply a unary function on the underlying value, if it
   * exists.
   * @template U
   * @param {(_: T) => U} fn
   * @returns {Maybe<U>}
   */
  map(fn) {
    switch (this.underlying.tag) {
      case "Nothing":
        return Maybe.Nothing;
      case "Some":
        return Maybe.Some(fn(this.underlying.value));
    }
  }

  /**
   * Flatten a maybe monad.
   * @template U
   * @this {Maybe<Maybe<U>>}
   * @returns {Maybe<U>}
   */
  join() {
    switch (this.underlying.tag) {
      case "Nothing":
        return Maybe.Nothing;
      case "Some":
        return this.underlying.value;
    }
  }

  /**
   * Apply a fallible function to the underlying value, if it
   * exists.
   * @template U
   * @param {(_: T) => Maybe<U>} fn
   * @returns {Maybe<U>}
   */
  bind(fn) {
    return this.map(fn).join();
  }

  /**
   * Return the underlying value, or throw the `error` if it
   * does not exist.
   * @param {Error} error
   * @returns {T}
   */
  orThrow(error) {
    switch (this.underlying.tag) {
      case "Nothing":
        throw error;
      case "Some":
        return this.underlying.value;
    }
  }
}

/**
 * The presence of a `value`, given as argument.
 * @template T
 * @param {T} value
 * @returns {Maybe<T>}
 */
Maybe.Some = (value) => new Maybe({ tag: "Some", value });

/**
 * The absence of a value.
 */
Maybe.Nothing = new Maybe({ tag: "Nothing" });

/**
 * Wrap the value (or its absence) in a maybe.
 * @template T
 * @param {T | null} value
 * @returns {Maybe<T>}
 */
Maybe.fromNull = (value) => {
  if (value === null) {
    return Maybe.Nothing;
  } else {
    return Maybe.Some(value);
  }
};
