import React, { useState, useEffect, useRef } from 'react'

import { Table } from 'antd'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResizeObserver from 'rc-resize-observer'
import { VariableSizeGrid as Grid } from 'react-window'

import './VirtualTable.css'

const VirtualTable = ({ scroll, ...others }) => {
  const { columns, ...tableProps } = others
  const [tableWidth, setTableWidth] = useState(0)
  const widthColumnCount = columns.filter(({ width }) => !width).length
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) }
  })
  const gridRef = useRef()
  const [connectObject] = useState(() => {
    const obj = {}
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          })
        }
      },
    })
    return obj
  })

  const resetVirtualGrid = () => {
    if (gridRef.current)
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      })
  }

  useEffect(() => resetVirtualGrid, [tableWidth])

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject
    const totalHeight = rawData.length * 54
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const { width } = mergedColumns[index]
          return totalHeight > scroll.y && index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          })
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    )
  }

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width)
      }}
    >
      <Table
        {...tableProps}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  )
}

VirtualTable.propTypes = {
  ...Table.propTypes,
  scroll: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
}

VirtualTable.defaultProps = {
  scroll: {
    x: '100%',
    y: 300,
  },
}

export default VirtualTable
