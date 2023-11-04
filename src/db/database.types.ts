export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_visible: boolean
          profile_id: string | null
          round: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          profile_id?: string | null
          round?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          profile_id?: string | null
          round?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ideas_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      words: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      words_ideas: {
        Row: {
          created_at: string
          id: string
          ideas_id: string
          words_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ideas_id: string
          words_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ideas_id?: string
          words_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "words_ideas_ideas_id_fkey"
            columns: ["ideas_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_ideas_words_id_fkey"
            columns: ["words_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      idea_function_test: {
        Args: {
          idea_title: string
          idea_description: string
        }
        Returns: undefined
      }
      insert_word_idea_after_insert_idea: {
        Args: {
          idea_title: string
          idea_description: string
          idea_is_visible: boolean
          words: string[]
          profile_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
