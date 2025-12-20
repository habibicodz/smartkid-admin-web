<script lang="ts">
	import addicon from '$lib/assets/add.svg';
	import { goto } from '$app/navigation';
	import SideMenuButton from '$lib/components/buttons/SideMenuButton.svelte';
	import AddGradeDialog from '$lib/components/dialogs/AddGradeDialog.svelte';
	import { supabaseClient } from '$lib/supabase_db/client/supabaseClient';
	import type { Tables } from '$lib/supabase_db/database.types';
	import { getGrades } from '$lib/supabase_db/dbutil.remote';
	import { onMount } from 'svelte';
</script>


<section class="main-container"></section>

<style>
</style>
