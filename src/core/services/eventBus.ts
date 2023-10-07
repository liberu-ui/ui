/**
 * This module provides a wrapper around the 'tiny-emitter' library to enhance
 * its ease of use and type safety.
 */

import emitter from 'tiny-emitter/instance';

/**
 * The event emitter interface.
 */
export interface Emitter {
  /**
   * Register an event listener for the specified event.
   * 
   * @param event The event to listen for.
   * @param listener The listener function to be called when the event occurs.
   */
  on(event: string, listener: (...args: any[]) => void): void;

  /**
   * Register a one-time event listener for the specified event.
   * The listener will be automatically removed after the first occurrence of the event.
   * 
   * @param event The event to listen for.
   * @param listener The listener function to be called when the event occurs.
   */
  once(event: string, listener: (...args: any[]) => void): void;

  /**
   * Remove an event listener for the specified event.
   * 
   * @param event The event to no longer listen for.
   * @param listener The listener function to be removed.
   */
  off(event: string, listener: (...args: any[]) => void): void;

  /**
   * Emit the specified event.
   * 
   * @param event The event to emit.
   * @param args The arguments to be passed to the event listeners.
   */
  emit(event: string, ...args: any[]): void;
}

/**
 * The default implementation of the event emitter.
 */
const defaultEmitter: Emitter = {
  on: (...args) => emitter.on(...args),
  once: (...args) => emitter.once(...args),
  off: (...args) => emitter.off(...args),
  emit: (...args) => emitter.emit(...args)
};

export default defaultEmitter;
