import React from 'react';

function Textarea( { className, ...props }: React.Component ) {
    return (
        <textarea
            className={cn("",className)}
            rows={ 3 }
            {...props }
        />
    );
}

export {Textarea};