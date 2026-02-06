import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'typebot-standard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { id?: string }, HTMLElement>;
        }
    }
}
