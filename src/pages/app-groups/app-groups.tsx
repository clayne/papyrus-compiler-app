import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import { styled } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'
import './app-groups.scss'
import { GroupModel } from '../../models'
import AppGroupsAddPopup from '../../components/app-groups-add-popup/app-groups-add-popup'
import AppGroupsItem from './app-groups-item'
import AppGroupsTitle from './app-groups-title'

export interface StateProps {
  groups: GroupModel[]
}

export interface DispatchesProps {
  addGroup: (group: GroupModel) => void
  removeGroup: (group: GroupModel) => void
  editGroup: (lastGroupName: string, group: GroupModel) => void
}

type Props = StateProps & DispatchesProps

const GroupsList = styled('div')({
  position: 'relative'
})

const AppGroups: React.FC<Props> = ({ groups, addGroup, removeGroup, editGroup }) => {
  const [showAddPopup, setShowPopup] = useState(false)
  const [isHoveringGroup, setHoveringGroup] = useState<GroupModel | undefined>(undefined)
  const [editingGroup, setEditingGroup] = useState<GroupModel | undefined>(undefined)

  const onClickRemoveGroup = useCallback((group: GroupModel) => {
    return () => {
      removeGroup(group)
    }
  }, [removeGroup])

  const onClickEditGroup = useCallback((group: GroupModel) => {
    return () => {
      setEditingGroup(group)
      setShowPopup(true)
    }
  }, [setEditingGroup])

  const createOnMouseEvent = useCallback((group?: GroupModel) => {
    return () => {
      if (showAddPopup) {
        return
      }

      if (isHoveringGroup !== group) {
        setHoveringGroup(group)
      }
    }
  }, [setHoveringGroup, isHoveringGroup, showAddPopup])

  const onClickAddButton = useCallback(() => {
    setEditingGroup(undefined)
    setShowPopup(true)
  }, [setShowPopup])

  const onGroupAdd = useCallback((group: Partial<GroupModel>) => {
    setShowPopup(false)

    addGroup(group as GroupModel)
  }, [addGroup, setShowPopup])

  const onGroupEdit = useCallback((lastGroupName: string, group: GroupModel) => {
    setShowPopup(false)
    editGroup(lastGroupName, group)
  }, [editGroup, setShowPopup])

  const onClosePopup = useCallback(() => {
    setShowPopup(false)
  }, [setShowPopup])

  const groupsList = useMemo(() => {
    return groups.map((group) => {
      const onMouseEnterGroup = createOnMouseEvent(group)
      const onMouseLeaveGroup = createOnMouseEvent(undefined)
      const onMouseMoveGroup = createOnMouseEvent(group)

      return (
        <AppGroupsItem
          onMouseEnter={onMouseEnterGroup}
          onMouseLeave={onMouseLeaveGroup}
          onMouseMove={onMouseMoveGroup}
          onDelete={onClickRemoveGroup}
          onEdit={onClickEditGroup}
          hoveringGroup={isHoveringGroup}
          group={group}
          key={group.name}
        />
      )
    })
  }, [groups, createOnMouseEvent, isHoveringGroup, onClickRemoveGroup, onClickEditGroup])

  return (
    <div className="app-groups container">
      <AppGroupsTitle onClickAddButton={onClickAddButton} />

      <div className="app-groups-content">
        <Fade in={showAddPopup} mountOnEnter unmountOnExit>
          <AppGroupsAddPopup
            group={editingGroup}
            open={showAddPopup}
            onGroupAdd={onGroupAdd}
            onGroupEdit={onGroupEdit}
            onClose={onClosePopup}
          />
        </Fade>

        <Fade in={groupsList.length > 0}>
          <GroupsList>
            {groupsList}
          </GroupsList>
        </Fade>

        <Fade in={groupsList.length === 0}>
          <Box>
            <p>You can create a group with the top-right button.</p>
            <p>A group is a set of scripts that can be easily loaded on the compilation view.</p>
          </Box>
        </Fade>
      </div>
    </div>
  )
}

export default AppGroups
