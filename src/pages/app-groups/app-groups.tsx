import React, { useCallback, useMemo, useState } from 'react'
import './app-groups.scss'
import AppTitle from '../../components/app-title/app-title'
import { GroupModel } from '../../models'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSTransition } from 'react-transition-group'
import AppGroupsAddPopup from '../../components/app-groups-add-popup/app-groups-add-popup'
import { map, max } from 'lodash-es'

export interface StateProps {
  groups: GroupModel[]
}

export interface DispatchesProps {
  addGroup: (group: GroupModel) => void
  removeGroup: (group: GroupModel) => void
  editGroup: (group: GroupModel) => void
}

type Props = StateProps & DispatchesProps

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

  const lastId = useMemo(() => {
    return max(
      groups.map((group) => max(map(group.scripts, 'id')))
    ) || 0
  }, [groups])

  const onClickAddButton = useCallback(() => {
    setShowPopup(true)
  }, [setShowPopup])

  const onGroupAdd = useCallback((group: GroupModel) => {
    setShowPopup(false)
    addGroup(group)
  }, [addGroup, setShowPopup])

  const onGroupEdit = useCallback((group: GroupModel) => {
    setShowPopup(false)
    editGroup(group)
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
        <div
          className="list-group-item overflow-hidden"
          key={group.id}
          onMouseEnter={onMouseEnterGroup}
          onMouseLeave={onMouseLeaveGroup}
          onMouseMove={onMouseMoveGroup}
        >
          <CSSTransition
            timeout={150}
            in={isHoveringGroup === group}
            classNames="app-fade-grow"
            mountOnEnter
            unmountOnExit
          >
            <div className="app-list-group-item-group-hover">
              <span
                className="app-list-group-item-group-hover-action app-list-group-item-group-hover-edit"
                onClick={onClickEditGroup(group)}
              >
                <FontAwesomeIcon icon="pen" />
              </span>
              <span
                className="app-list-group-item-group-hover-action app-list-group-item-group-hover-remove"
                onClick={onClickRemoveGroup(group)}
              >
                <FontAwesomeIcon icon="trash" />
              </span>
            </div>
          </CSSTransition>
          <div className="app-groups-list-group-item-name">{group.name}</div>
          <div className="app-groups-list-group-item-scripts">
            {group.scripts.length > 0 ? (
              <>
                {group.scripts.slice(0, 3).map((script) => script.name).join(', ')}
                {group.scripts.length > 3 ? ', ...' : ''}
              </>
            ) : (
              <>
                No scripts
              </>
            )}
          </div>
        </div>
      )
    })
  }, [groups, createOnMouseEvent, isHoveringGroup, onClickRemoveGroup, onClickEditGroup])

  return (
    <div className="app-groups container">
      <AppTitle className="d-flex">
        Groups

        <div className="app-groups-actions">
          <div
            className={classNames({
              'app-groups-action': true
            })}
            onClick={onClickAddButton}
          >
            <FontAwesomeIcon
              icon="plus-circle"
            />
          </div>
        </div>
      </AppTitle>

      <div className="app-groups-content">
        <CSSTransition
          in={showAddPopup}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames="app-fade"
        >
          <AppGroupsAddPopup
            lastId={lastId}
            group={editingGroup}
            onGroupAdd={onGroupAdd}
            onGroupEdit={onGroupEdit}
            onClose={onClosePopup}
          />
        </CSSTransition>

        <div className="app-groups-list list-group">
          {groupsList}
        </div>
      </div>
    </div>
  )
}

export default AppGroups
