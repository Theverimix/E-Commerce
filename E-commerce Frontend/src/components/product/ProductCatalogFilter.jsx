import React, { useState, useEffect } from 'react'
import { classNames } from 'primereact/utils'
import { Tree } from 'primereact/tree'
import { Slider } from 'primereact/slider'
import { Panel } from 'primereact/panel'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function ProductCatalogFilter({ onSubmitPrice, onSubmitCategory }) {
    const [price, setPrice] = useState([0, 5000])
    const [expandedKeys, setExpandedKeys] = useState({
        0: true,
        1: true,
        2: true,
        3: true,
    })

    const nodes = [
        {
            key: '0',
            label: 'Categories',
            expandedKeys: true,
            children: [
                {
                    key: '0-0',
                    label: 'Supplements',
                },
                {
                    key: '0-1',
                    label: 'Accessories',
                },
                {
                    key: '0-2',
                    label: 'Clothes',
                },
                {
                    key: '0-3',
                    label: 'Equipment',
                },
            ],
        },
    ]

    const nodeTemplate = (node, options) => {
        let label = <b>{node.label}</b>

        if (node.url) {
            label = (
                <a
                    href={node.url}
                    className='text-700 hover:text-primary no-underline'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {node.label}
                </a>
            )
        }

        return <span className={options.className}>{label}</span>
    }

    const togglerTemplate = (node, options) => {
        if (!node) {
            return
        }

        const expanded = options.expanded
        const iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
            'pi-caret-right': !expanded,
            'pi-caret-down': expanded,
        })

        return (
            <button type='button' className='p-tree-toggler p-link' tabIndex={-1} onClick={options.onClick}>
                <span className={iconClassName} aria-hidden='true'></span>
            </button>
        )
    }

    const handleChangePrice = (e) => {
        const [min, max] = e.value
        if (max > min) {
            setPrice([min, max])
        } else {
            setPrice([max, min])
        }
    }

    return (
        <div key='filter' className='card justify-content-center w-full'>
            <Panel header='Price filter' className='w-full'>
                <Slider
                    value={price}
                    onChange={handleChangePrice}
                    onSlideEnd={handleChangePrice}
                    className='w-full'
                    max={5000}
                    step={50}
                    range
                />
                <p className='text-sm text-500 flex justify-content-between'>
                    {'US$ ' + price[0]} - {'US$ ' + price[1]}
                    <Button
                        // className='w-auto h-2rem font-semibold'
                        // className='w-auto h-2rem font-semibold product-list-button no-underline hover:underline hover:text-yellow-300 cursor-pointer'
                        label='Filter'
                        text
                        onClick={() => onSubmitPrice(price[0], price[1])}
                    />
                </p>
            </Panel>
            <Tree
                value={nodes}
                nodeTemplate={nodeTemplate}
                selectionMode='single'
                togglerTemplate={togglerTemplate}
                // className="w-full md:w-30rem"
                expandedKeys={expandedKeys}
                className='hover:cursor-pointer w-full'
                onNodeClick={(node) => {
                    if (node.node.label !== 'Categories') {
                        onSubmitCategory(node.node.label)
                    }
                }}
            />
        </div>
    )
}
