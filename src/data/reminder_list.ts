/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const reminder_list: FlowTypes.Reminder_list[] = [
  {
    "flow_type": "reminder_list",
    "flow_name": "reminder_list",
    "status": "released",
    "rows": [
      {
        "reminder_id": "reminder_relax",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "calm_random",
        "priority": 0,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "@fields.mod_welcome_daily_calm == 'Yes'"
              }
            },
            "_raw": "field_evaluation | @fields.mod_welcome_daily_calm == 'Yes'",
            "_cleaned": "field_evaluation | @fields.mod_welcome_daily_calm == 'Yes'",
            "_parsed": [
              [
                "field_evaluation"
              ],
              [
                "@fields.mod_welcome_daily_calm == 'Yes'"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": "<=",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "sent | within:1:day",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent | within:1:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ],
              [
                "within",
                "1",
                "day"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_morning",
          "campaign_main",
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_1",
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before:1:day",
            "_cleaned": "db_lookup:first |app_events:event_id | app_launch | before:1:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "before",
                "1",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_praise_teen",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_praise_teen",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "2",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before:2:day",
            "_cleaned": "db_lookup:first |app_events:event_id | app_launch | before:2:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "before",
                "2",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_praise_teen"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": "<=",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_praise_teen | within:1:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_praise_teen | within:1:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_praise_teen"
              ],
              [
                "within",
                "1",
                "day"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_relax",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_relax",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "3",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before:3:day",
            "_cleaned": "db_lookup:first |app_events:event_id | app_launch | before:3:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "before",
                "3",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_photo_activity",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_photo_activity",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "4",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before:4:day",
            "_cleaned": "db_lookup:first |app_events:event_id | app_launch | before:4:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "before",
                "4",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_welcome_photo_activity"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "task_completed | task_welcome_photo_activity",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_welcome_photo_activity",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_welcome_photo_activity"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_unlocked",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_unlocked",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "7",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before:7:day",
            "_cleaned": "db_lookup:first |app_events:event_id | app_launch | before:7:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "before",
                "7",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_par",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_par",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips | before:1:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips | before:1:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "1",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_activity_reminder",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_activity_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "2",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips | before:2:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips | before:2:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "2",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_spend_time"
                },
                "order": "asc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": "<=",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed:first| task_spend_time | within:1:day",
            "_cleaned": "db_lookup:first | task_actions:task_id| task_spend_time | within:1:day",
            "_parsed": [
              [
                "db_lookup",
                "first"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_spend_time"
              ],
              [
                "within",
                "1",
                "day"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_activity_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_27",
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "3",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips | before:3:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips | before:3:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "3",
                "day"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_spend_time"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "task_completed | task_spend_time",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_spend_time",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_spend_time"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_open_app_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_open_app_praise",
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "3",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips  | before:3:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips  | before:3:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "3",
                "day"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": "<=",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "app_launch | within:1:day",
            "_cleaned": "db_lookup:last | app_events:event_id | app_launch | within:1:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "within",
                "1",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_spend_time"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "task_completed | task_spend_time",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_spend_time",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_spend_time"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_other_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_other_praise",
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "3",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips  | before:3:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips  | before:3:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "3",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_spend_time"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "task_completed | task_spend_time",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_spend_time",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_spend_time"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": "<=",
                  "value": "1",
                  "unit": "day"
                }
              }
            },
            "_raw": "app_launch | within:1:day",
            "_cleaned": "db_lookup:last | app_events:event_id | app_launch | within:1:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "app_events",
                "event_id"
              ],
              [
                "app_launch"
              ],
              [
                "within",
                "1",
                "day"
              ]
            ]
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_fun",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_fun",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_1on1_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_1on1_tips | before:5:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_1on1_tips | before:5:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_1on1_tips"
              ],
              [
                "before",
                "5",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_1",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_teen_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_praise_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "2",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_praise_tips | before:2:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_praise_tips | before:2:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_praise_tips"
              ],
              [
                "before",
                "2",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_2",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_teen_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_praise_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_praise_tips | before:5:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_praise_tips | before:5:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_praise_tips"
              ],
              [
                "before",
                "5",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_3",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_adult_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_praise_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "3",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_praise_tips | before:3:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_praise_tips | before:3:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_praise_tips"
              ],
              [
                "before",
                "3",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_7",
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_praise_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_praise_tips | before:6:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_praise_tips | before:6:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_praise_tips"
              ],
              [
                "before",
                "6",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_fun",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_fun",
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "task_actions",
                "filter": {
                  "field": "task_id",
                  "value": "task_mod_praise_tips"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "task_completed | task_mod_praise_tips | before:6:day",
            "_cleaned": "db_lookup:last | task_actions:task_id | task_mod_praise_tips | before:6:day",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "task_actions",
                "task_id"
              ],
              [
                "task_mod_praise_tips"
              ],
              [
                "before",
                "6",
                "day"
              ]
            ]
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "reminders",
                "filter": {
                  "field": "reminder_id",
                  "value": "sent"
                },
                "order": "desc",
                "sort_by": "_created",
                "evaluate": null
              }
            },
            "_raw": "sent",
            "_cleaned": "db_lookup:last | reminders:reminder_id | sent",
            "_parsed": [
              [
                "db_lookup",
                "last"
              ],
              [
                "reminders",
                "reminder_id"
              ],
              [
                "sent"
              ]
            ]
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      }
    ]
  }
]