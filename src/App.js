import React, { Fragment } from 'react'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import CssBaseline from '@material-ui/core/CssBaseline'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnhancedTable from './components/Table/EnhancedTable'


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox
          ref={resolvedRef}
          {...rest}
        />
      </>
    )
  }
)

const Tablee = (props) => {

  //use initial true to set columns show deaful in table
  const [columns] = React.useState([
    {
      id: 'selection',
      Header: ({ getToggleAllRowsSelectedProps, ...rest }) => (
        <div
         onClick = {() => {
            alert(JSON.stringify(rest.data, null, 1))
          }
          }
         >
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => {
        return (
          <div
          onClick = {() => {
            alert(JSON.stringify(row.original, null, 1))
          } 
            }
          >
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        )
      },
      toggle: false
    },
    {
      Header: 'Application Date',
      accessor: 'created',
      initial: true
    },
    {
      Header: 'Employee Name',
      accessor: 'name',
      initial: true
    },
    {
      Header: 'Species',
      accessor: 'species',
      initial: true
    },
    {
      Header: 'status',
      accessor: 'status',
      initial: true
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      initial: true
    },
    {
      Header: 'image',
      accessor: 'image',
      initial: true,
      Cell: (cell) => {
        return (
          <Avatar
            src={cell.value}
          />
        )
      },
    },
  ]);

  return (
    <Query query={POST_QUERY}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return (
            <CircularProgress />
          )
        }

        if (error) {
          return (
            <div className="flex w-80 h-100 items-center justify-center pt7">
              <div>An unexpected error occured.</div>
            </div>
          )
        }
        const { characters: { results = [] } } = data;
        return (
          <Fragment>
            <CssBaseline />
            
            <EnhancedTable
              columns={columns}
              data={results}
              pagination={true}
            />
          </Fragment>
        )
      }}

    </Query>
  )
}



const POST_QUERY = gql`
query {
  characters(page: 1) {
    info {
      count
    }
    results {
      name
      status
      created
      species
      image
      gender
    }
  }
  character(id: 1) {
    id
  }
}
`

export default Tablee
